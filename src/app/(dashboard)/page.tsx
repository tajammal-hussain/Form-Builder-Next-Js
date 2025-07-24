import React, { Suspense } from 'react'
import { GetForms, GetFormStats } from '../../../actions/form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowBigRight, ChartBarIcon, Edit2Icon, LucideFormInput, LucideView } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { CreateFormBtn } from '@/components/CreateFormBtn'
import { Badge } from '@/components/ui/badge'
import { formatDistance } from 'date-fns'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Home = () => {
  return (
    <div className='w-full m-full'>
      <Suspense fallback= {<StatsCards loading={true}/>}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className='my-6'/>
      <h2 className='text-4xl font-bold col-span-2'>Your Forms</h2>
      <Separator className='my-6'/>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <CreateFormBtn/>
        <Suspense fallback={[1,2,3,4].map((_, index) => (
            <FormCardSkeleton key={index}/>
          ))}>
          <FormCards/>
        </Suspense>
      </div>
    </div>
  )
}

export default Home


interface StatsCardProps{
  data? : Awaited<ReturnType<typeof GetFormStats>>;
  loading : boolean;
}

async function CardStatsWrapper (){
  const stats = await GetFormStats();
  return <StatsCards data={stats} loading={false}/>
}
function StatsCards(props: StatsCardProps){
  const {data, loading} = props

  return (
    <div className='w-full pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4'>
      <StatsCard title='Visits'
      value={data?.visits || 0}
      loading={loading}
      icon={<ChartBarIcon className='w-6 h-6 text-blue-500'/>}
      className='shadow-md shadow-blue-500/20'
      />
      <StatsCard title='Submissions'
      value={data?.submissions || 0}
      loading={loading}
      icon={<ChartBarIcon className='w-6 h-6 text-blue-500'/>}
      className='shadow-md shadow-blue-500/20'
      />
      <StatsCard title='Submission Rate'
      value={data?.submissionRate.toLocaleString() + "%" || 0}
      loading={loading}
      icon={<ChartBarIcon className='w-6 h-6 text-blue-500'/>}
      className='shadow-md shadow-blue-500/20'
      />
      <StatsCard title='Bounce Rate'
      value={data?.bounceRate.toLocaleString() + "%" || 0}
      loading={loading}
      icon={<ChartBarIcon className='w-6 h-6 text-blue-500'/>}
      className='shadow-md shadow-blue-500/20'
      />
    </div>
  )

}
function StatsCard({title, value, loading, icon, className}:{title: string, value: number | string, loading: boolean, icon: React.ReactNode, className: string}){

  return (
    <Card className={cn('flex flex-col p-4', className)}>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <div className='flex items-center gap-2'>
          {icon}
        </div>
      </CardHeader>
      <CardContent className='flex flex-row items-center justify-between'>
        <div className='flex flex-col'>
          <div className='text-2xl font-bold'>
            {loading ? <Skeleton className='w-10 h-4'/> : value}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FormCardSkeleton(){
  return <Skeleton className='border-2 border-primary/20 h-[190px] w-full'/>
}
async function FormCards(){
  const form = await GetForms();
  return <>
  {form.map((form) => (
    <FormCard key={form.id} form={form}/>
  ))}
  </>
}function FormCard ({form}: {form: Awaited<ReturnType<typeof GetForms>>[number]}){
  return (
    <Card className='bg-card text-card-foreground shadow py-3'>
      <CardHeader className='flex flex-col space-y-1.5 p-6'>
        <CardTitle className='text-sm font-medium flex items-center gap-2 justify-between w-full'>
          <span className='truncate font-bold'>{form.name}</span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant='destructive'>Draft</Badge>}
        </CardTitle>
        <CardDescription className='flex flex-row justify-between text-muted-foreground text-sm'>
          {formatDistance(form.createdAt, new Date(), {addSuffix: true})}
          {
            form.published && (
              <span className='flex items-center gap-2'>
                <LucideView className='text-muted-foreground' size={16}/>
                <span className='text-muted-foreground'>{form.visits.toLocaleString()}</span>
                <LucideFormInput className='text-muted-foreground' size={16}/>
                <span className='text-muted-foreground'>{form.submissions.toLocaleString()}</span>
              </span>
            )
          }
        </CardDescription>
      
       
      </CardHeader>
      <CardContent className='h-[20px] truncate text-sm text-muted-foreground'>
          {form.description || "No description"}
        </CardContent>
      <CardFooter className='flex items-center p-6 pt-0'>
            {form.published && (
              <Button asChild className='w-full  flex items-center gap-2'>
                <Link href={`/builder/${form.id}`}>View Submissions <ArrowBigRight /></Link>
              </Button>
            )}
            {!form.published && (
              <Button asChild className='w-full  flex items-center gap-2'>
                <Link href={`/builder/${form.id}`}>Edit Form <Edit2Icon /></Link>
              </Button>
            )}
        </CardFooter>
    </Card>
  )
}

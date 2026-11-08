// import { useFormContext } from '@/context/form/formContext'
import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router'
import { motion, Variants } from 'framer-motion'
import {
  ArrowUpRight,
  Building2,
  Folder,
  Image as ImageIcon,
  MapPin,
  Tag
} from 'lucide-react'
import { useHouse } from '../hooks/useHouse'

import { PaginationComponent } from '@/components/PaginationComponent'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { IFilter } from '@/Model/IApi'
import { type House } from '@/Model/IEstate'
import { routes } from '@/routes_Apis'
import { useNavigate } from 'react-router'
import { useHouseTypes } from '../hooks/useHouseType'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15
    }
  }
}

const HouseCard = function (props: { house: House; index: string }) {
  const navigate = useNavigate()
  const { house } = props

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className='group h-full'
    >
      <Card className='flex h-full flex-col overflow-hidden transition-all duration-300 group-hover:shadow-lg dark:group-hover:shadow-primary/5'>
        {/* Cover Image & Category Badge */}
        <div className='relative aspect-video w-full overflow-hidden bg-muted'>
          <img
            src={house.mainImage}
            alt={house.title}
            className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
            loading='lazy'
          />

          {/* House Type Badge */}
          {house.houseType?.name && (
            <div className='absolute left-3 top-3'>
              <Badge
                variant='secondary'
                className='flex items-center gap-1 bg-background/80 text-xs font-medium shadow-sm backdrop-blur-md'
              >
                <Folder className='] h-3 w-3 text-primary' />
                {house.houseType.name}
              </Badge>
            </div>
          )}
        </div>

        {/* Card Header: Title */}
        <CardHeader className='p-4 pb-2'>
          <CardTitle className='text-[#d1b797 line-clamp-1 text-lg font-bold transition-colors group-hover:text-primary'>
            {house.title}
          </CardTitle>
        </CardHeader>

        {/* Card Body: City, Price & Location */}
        <CardContent className='flex-1 space-y-2.5 p-4 pt-0'>
          {/* Flex Row with Space-Between: City on the start, Price on the end */}
          <div className='flex w-full items-center justify-between gap-2 border-b border-border/40 pb-2.5 text-sm'>
            {/* City (Start) with Icon */}
            <div className='flex items-center gap-1.5 font-medium text-foreground'>
              <Building2 className='h-4 w-4 shrink-0 text-[#d1b797]' />
              <span className='line-clamp-1'>{house.city}</span>
            </div>

            {/* Price (End - Conditional if exists) */}
            {house.price && (
              <div className='flex shrink-0 items-center gap-1 font-semibold text-primary'>
                <Tag className='h-3.5 w-3.5 text-[#d1b797]' />
                <span className=''>${house.price}</span>
              </div>
            )}
          </div>

          {/* Location with Icon */}
          <div className='flex items-center gap-1.5 text-xs text-muted-foreground'>
            <MapPin className='h-3.5 w-3.5 shrink-0 text-muted-foreground/80' />
            <span className='line-clamp-1'>{house.location}</span>
          </div>
        </CardContent>

        {/* Card Footer */}
        <CardFooter className='p-4 pt-0'>
          <Button
            variant='outline'
            size='sm'
            className='group/btn w-full justify-between transition-colors hover:bg-primary hover:text-primary-foreground'
            onClick={() => {
              navigate(routes.show_house.concat(`/${house._id}`))
            }}
          >
            <span>View Details</span>
            <ArrowUpRight className='h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5' />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default function House() {
  //   const { setProject } = useFormContext()
  //   const navigate = useNavigate()
  const House = useHouse()
  const houseType = useHouseTypes({})

  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<IFilter | undefined>(undefined)
  // getting the data first time
  useEffect(() => {
    House.getData({ page, filter: filter })
  }, [page, filter])

  if ((!House.data || House.data.data.length === 0) && !House.loading) {
    return (
      <div className='flex min-h-[300px] flex-col items-center rounded-xl py-4 text-center'>
        <div className='flex w-full items-center justify-between'>
          <div className='mb-4 ms-2 flex flex-col items-start justify-start gap-4'>
            <h1 className='text-2xl font-bold'>All Houses</h1>
            <Select
              onValueChange={e => {
                setPage(1)
                setFilter({ name: 'houseType', operator: 'equal', value: e })
              }}
              defaultValue={filter?.value}
              value={filter?.value}
            >
              <SelectTrigger className='w-64 cursor-pointer'>
                <SelectValue placeholder='select house type'></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem className='cursor-pointer' key={'All'} value={''}>
                    {`All`}
                  </SelectItem>
                  {houseType.loading
                    ? '...Loading'
                    : houseType.data?.data.map(houseType => (
                        <SelectItem
                          className='cursor-pointer'
                          key={houseType._id}
                          value={houseType._id}
                        >
                          {houseType.name}
                        </SelectItem>
                      ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <span>
              total:{' '}
              <span className='font-bold'>
                {!House.loading ? House?.data?.total : ''}
              </span>
            </span>
          </div>

          <PaginationComponent
            loading={House.loading}
            page={page}
            setPage={setPage}
            total={House?.data?.total as number}
          />
        </div>

        <ImageIcon className='mb-3 h-10 w-10 text-muted-foreground' />
        <h3 className='text-lg font-semibold'>No Houses Found</h3>
        <p className='text-sm text-muted-foreground'>
          There are currently no houses available to display.
        </p>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-4 py-4'>
      {/* pagination header */}
      <div className='flex w-full items-center justify-between'>
        <div className='mb-4 ms-2 flex flex-col items-start justify-start gap-4'>
          <h1 className='text-2xl font-bold'>All Houses</h1>
          <Select
            onValueChange={e => {
              setPage(1)
              setFilter({ name: 'houseType', operator: 'equal', value: e })
            }}
            defaultValue={filter?.value}
            value={filter?.value}
          >
            <SelectTrigger className='w-64 cursor-pointer'>
              <SelectValue placeholder='select house type'></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem className='cursor-pointer' key={'All'} value={''}>
                  {`All`}
                </SelectItem>
                {houseType.loading
                  ? '...Loading'
                  : houseType.data?.data.map(houseType => (
                      <SelectItem
                        className='cursor-pointer'
                        key={houseType._id}
                        value={houseType._id}
                      >
                        {houseType.name}
                      </SelectItem>
                    ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <span>
            total:{' '}
            <span className='font-bold'>
              {!House.loading ? House?.data?.total : ''}
            </span>
          </span>
        </div>

        <PaginationComponent
          loading={House.loading}
          page={page}
          setPage={setPage}
          total={House?.data?.total as number}
        />
      </div>

      {/* grid */}
      {House.loading ? (
        <div className='grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className='h-80 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800'
            />
          ))}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        >
          {House?.data?.data &&
            House.data.data.map((house, index) => {
              // Fallback key if _id is undefined
              return (
                <HouseCard
                  key={house._id || `house-${index}`}
                  house={house}
                  index={String(index)}
                />
              )
            })}
        </motion.div>
      )}
    </div>
  )
}

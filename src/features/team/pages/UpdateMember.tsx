import { useFormContext } from '@/context/form/formContext'

const AddUpdateMember = function () {
  const { member } = useFormContext()
  console.log(`this is memeber inside edit: \n`, member)
  return <>edit </>
}
export default AddUpdateMember

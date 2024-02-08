import React from 'react'
import UserProfileCard from '../../components/Card/UserProfileCard'
import CorporateCustomerProfileCard from '../../components/Card/CorporateCustomerProfileCard'
import { useAppSelector } from '../../store/configureStore'

type Props = {}

const UserProfile = (props: Props) => {
  const authorities:string[] | undefined = useAppSelector(state => state.getCustomerByEmail.data?.authorities)
  return (
    <div>
       {authorities?.includes("CORPORATE_CUSTOMER") && (
      <CorporateCustomerProfileCard/>
      )}
      {authorities?.includes("CUSTOMER") && (
      <UserProfileCard/>
      )}
    </div>
  )
}

export default UserProfile
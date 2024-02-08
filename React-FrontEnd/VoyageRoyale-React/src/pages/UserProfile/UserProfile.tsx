import React from 'react'
import UserProfileCard from '../../components/Card/UserProfileCard'
import CorporateCustomerProfileCard from '../../components/Card/CorporateCustomerProfileCard'

type Props = {}

const UserProfile = (props: Props) => {
  return (
    <div>
      <CorporateCustomerProfileCard/>
      <UserProfileCard/>
    </div>
  )
}

export default UserProfile
import React from 'react'

import { Button, Input, Text } from '@nextui-org/react'

export default function Dashboard() {
  return (
    <>
    {/* example next ui*/}
    <Button color='primary'>default</Button>
    <Text css={{background : '$neutral200'}}>Halo</Text>
    <Input 
    bordered
    label='Email'
    placeholder='email@carehospital.com'
    />
    </>
  )
}

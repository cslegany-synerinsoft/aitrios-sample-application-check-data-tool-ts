/*
 * Copyright 2023 Sony Semiconductor Solutions Corp. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useEffect, useState, useContext } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import axios from '@/features/showcase/utils/axios'
import { setTargetContext } from '@/features/showcase/stores'
import { type DeviceId } from '@/features/showcase/types'
import SimpleSpinner from '@/components/elements/simpleSpinner'

export default function DeviceSelect() {
  const [devices, setDevices] = useState<DeviceId[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { setTargetDevice } = useContext(setTargetContext)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get('/api/getDevices')
      .then((response) => {
        if (response.status === 200) {
          if (Object.keys(response.data).length === 0) {
            window.alert('Device not found.')
          } else {
            setDevices(response.data)
          }
        } else {
          window.alert('getDevices : ERROR')
        }
      })
      .catch((error) => {
        if (error.response) {
          window.alert(error.response.data.message)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const handleChange = (event: SelectChangeEvent<string>) => {
    setTargetDevice(event.target.value)
  }

  return (
    <>
      <SimpleSpinner openBackdrop={isLoading} />
      <FormControl fullWidth>
        <InputLabel data-testid="device-select-label" id="device-select-label">
          DeviceID
        </InputLabel>
        <Select
          defaultValue=""
          data-testid="device-select"
          label="DeviceID"
          onChange={(event: SelectChangeEvent<string>) => {
            handleChange(event)
          }}
        >
          {devices.map((device: DeviceId, index: number) => (
            <MenuItem data-testid={`device-item-${index}`} key={device} value={device}>
              {device}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

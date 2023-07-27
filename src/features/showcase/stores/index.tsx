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

import { createContext, useState, type ReactNode, useMemo } from 'react'
import { type DeviceId, type DirectoryName } from '../types'

interface Props {
  children: ReactNode
}

interface ContextType {
  targetDevice: DeviceId
  targetDirectory: DirectoryName
}

interface SetContextType {
  setTargetDevice: (value: DeviceId) => void
  setTargetDirectory: (value: DirectoryName) => void
}

export const TargetContext = createContext<ContextType>({} as ContextType)

export const setTargetContext = createContext<SetContextType>({} as SetContextType)

export function TargetProvider(props: Props) {
  const { children } = props

  const [targetDevice, setTargetDevice] = useState<DeviceId>('')
  const [targetDirectory, setTargetDirectory] = useState<DirectoryName>('')

  const contextValue = useMemo(() => ({ targetDevice, targetDirectory }), [targetDevice, targetDirectory])

  const setContextValue = useMemo(
    () => ({ setTargetDevice, setTargetDirectory }),
    [setTargetDevice, setTargetDirectory],
  )

  return (
    <TargetContext.Provider value={contextValue}>
      <setTargetContext.Provider value={setContextValue}>{children}</setTargetContext.Provider>
    </TargetContext.Provider>
  )
}

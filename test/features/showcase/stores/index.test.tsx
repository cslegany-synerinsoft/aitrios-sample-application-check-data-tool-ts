/**
 * @jest-environment jsdom
 */

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

import { useContext, useEffect } from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { TargetProvider, TargetContext } from '@/features/showcase/stores'

const testDevice = 'sid-11111111'
const testDirectory = 'testDirectory-1'

describe('TargetContext', () => {
  it('should set and get deviceId data using useContext', async () => {
    function TestingComponent() {
      const { targetDevice, setTargetDevice, targetDirectory, setTargetDirectory } = useContext(TargetContext)

      useEffect(() => {
        setTargetDevice(testDevice)
        setTargetDirectory(testDirectory)
      }, [])

      return (
        <>
          <p data-testid="target-device">{targetDevice}</p>
          <p data-testid="target-directory">{targetDirectory}</p>
        </>
      )
    }

    render(
      <TargetProvider>
        <TestingComponent />
      </TargetProvider>,
    )

    const targetDevice = screen.getByTestId('target-device')
    expect(targetDevice).toHaveTextContent(testDevice)
    const targetDirectory = screen.getByTestId('target-directory')
    expect(targetDirectory).toHaveTextContent(testDirectory)
  })
})

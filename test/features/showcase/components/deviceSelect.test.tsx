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

import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import DeviceSelect from '@/features/showcase/components/deviceSelect'

const interceptionData = ['sid-11111111', 'sid-22222222', 'sid-33333333']

const mockServer = setupServer(
  rest.get('/api/getDevices', (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ deviceList: interceptionData })),
  ),
)

describe('DeviceSelector', () => {
  beforeAll(() => {
    mockServer.listen()
  })
  afterAll(() => {
    mockServer.close()
  })
  it('should display select box with correct data', async () => {
    render(<DeviceSelect />)

    const inputLabel = screen.getByTestId('device-select-label')
    expect(inputLabel).toHaveTextContent('DeviceID')

    // wait for API response asynchronously
    await waitFor(() => {
      const selector = screen.getByTestId('device-select')
      const deviceNameButton = within(selector).getByRole('button') as HTMLInputElement
      userEvent.click(deviceNameButton)
    })

    // wait for re-rendering
    await waitFor(() => {
      const listBox = within(screen.getByRole('presentation')).getByRole('listbox')
      const listItems = within(listBox).getAllByRole('option')

      listItems.forEach((listItem, index) => {
        userEvent.click(listItem)

        const listItemById = screen.getByTestId(`device-item-${index}`)
        expect(listItemById).toHaveTextContent(interceptionData[index])
      })
    })
  })
})

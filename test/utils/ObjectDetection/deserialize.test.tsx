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

import deserializeObjectDetection from '@/utils/ObjectDetection/deserialize'

describe('deserializeObjectDetection', () => {
  it('should deserialize inference data and return object', async () => {
    // [ { '1': { C: 0, P: 0.7890625, X: 143, Y: 114, x: 156, y: 183 } } ]
    const testData =
      'DAAAAAAABgAKAAQABgAAAAwAAAAAAAYACAAEAAYAAAAEAAAAAQAAABAAAAAMABAAAAAHAAgADAAMAAAAAAAAARQAAAAAAEo/DAAUAAQACAAMABAADAAAAI8AAAByAAAAnAAAALcAAAA='

    const decodedData = Buffer.from(testData, 'base64')
    const deserializedData = deserializeObjectDetection(decodedData)
    const inferenceData = JSON.stringify(deserializedData)
    const parsedData = JSON.parse(inferenceData)

    console.log(parsedData)

    expect(parsedData[0]['1'].P).toEqual(0.7890625)
  })
})

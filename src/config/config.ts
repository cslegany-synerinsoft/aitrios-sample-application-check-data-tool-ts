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

import * as fs from 'fs'
import * as yaml from 'js-yaml'

export interface ConsoleSettings {
  console_access_settings: {
    console_endpoint: string
    portal_authorization_endpoint: string
    client_secret: string
    client_id: string
  }
}

const consoleAccessSettingFilePath = './src/config/console_access_settings.yaml'

export function getConsoleSettings() {
  let consoleAccessSettings: ConsoleSettings = {
    console_access_settings: {
      console_endpoint: '',
      portal_authorization_endpoint: '',
      client_secret: '',
      client_id: '',
    },
  }

  if (!fs.existsSync(consoleAccessSettingFilePath)) {
    console.log('Configuration file does not exist.')
    return consoleAccessSettings
  }
  if (fs.lstatSync(consoleAccessSettingFilePath).isSymbolicLink()) {
    console.log('Can not open symbolic link as a file.')
    return consoleAccessSettings
  }
  const consoleAccessSettingFileData = yaml.load(
    fs.readFileSync(consoleAccessSettingFilePath, { encoding: 'utf8', flag: 'r' }),
  ) as ConsoleSettings
  consoleAccessSettings = {
    console_access_settings: {
      console_endpoint: consoleAccessSettingFileData.console_access_settings.console_endpoint,
      portal_authorization_endpoint:
        consoleAccessSettingFileData.console_access_settings.portal_authorization_endpoint,
      client_secret: consoleAccessSettingFileData.console_access_settings.client_secret,
      client_id: consoleAccessSettingFileData.console_access_settings.client_id,
    },
  }
  return consoleAccessSettings
}

# Recall AI Node.js SDK

A Node.js SDK for integrating with the [Recall AI](https://docs.recall.ai/reference/authentication) API - a video conferencing integration platform that enables automated meeting participation, recording, and transcription.

## Installation

`npm install recall_sdk`

## Getting Started

To use the SDK, you'll need an API key from Recall AI and specify your region.

```typescript
import { Recall } from 'recall_sdk';
const recall = new Recall({
apiKey: 'api-key',
region: 'us-east-2' 
});
```

## TypeScript Support

This SDK is written in TypeScript and includes type definitions out of the box.

// ... rest of README content ...

## License

                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   Copyright 2024 sam-ayo

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

// ... rest of README content ...

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

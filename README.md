# Recall AI Node.js SDK
A Node.js SDK for integrating with the [Recall AI](https://docs.recall.ai) API - a video conferencing integration platform that enables automated meeting participation, recording, and transcription.

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


## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

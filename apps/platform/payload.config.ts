import { buildConfig } from 'payload';
import type { Config } from 'payload';
import payloadSharedConfig from './payload.shared-config.mjs';

export default buildConfig(payloadSharedConfig as Config);

import { registerAs } from '@nestjs/config';

export default registerAs('gcp', () => {
  const projectId = process.env.GCP_PROJECT;

  if (!projectId) {
    throw new Error(
      'GCP project id must be set with GCP_PROJECT environment variable.',
    );
  }
  return {
    projectId,
  };
});

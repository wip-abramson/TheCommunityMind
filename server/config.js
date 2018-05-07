import dotenv from 'dotenv';

dotenv.config({ silent: true });

export const { JWT_SECRET, RDS_DB_NAME, RDS_USERNAME, RDS_PASSWORD, RDS_PORT, RDS_HOSTNAME } = process.env;

export default JWT_SECRET;
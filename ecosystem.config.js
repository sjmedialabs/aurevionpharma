module.exports = {
  apps: [
    {
      name: 'aurevion-pharma',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 8142',
      cwd: '/www/wwwroot/aurevion',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        
        // Gmail SMTP (Working) - Sends FROM sales@aurevionpharma.com
        SMTP_HOST: 'smtp.gmail.com',
        SMTP_PORT: '587',
        SMTP_USER: 'sudheer@sjmedialabs.com',
        SMTP_PASS: 'mjoicoozoifsutnu'
      },
      error_file: '/www/wwwroot/aurevion/logs/err.log',
      out_file: '/www/wwwroot/aurevion/logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
    }
  ]
}

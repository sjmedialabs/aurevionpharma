# Aurevion Pharma - VPS Deployment Guide

This guide will help you deploy the Aurevion Pharma application to your VPS.

## Prerequisites

- Ubuntu 20.04+ or similar Linux distribution
- Root or sudo access
- Domain name pointed to your VPS IP address
- At least 2GB RAM recommended

## Step 1: Initial Server Setup

### 1.1 Update System
\`\`\`bash
sudo apt update && sudo apt upgrade -y
\`\`\`

### 1.2 Install Node.js
\`\`\`bash
# Install Node.js 18.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
\`\`\`

### 1.3 Install PM2 (Process Manager)
\`\`\`bash
sudo npm install -g pm2

# Set PM2 to start on system boot
pm2 startup systemd
# Follow the command output instructions
\`\`\`

### 1.4 Install Nginx
\`\`\`bash
sudo apt install -y nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
\`\`\`

### 1.5 Install Git
\`\`\`bash
sudo apt install -y git
\`\`\`

## Step 2: Install MongoDB

### 2.1 Install MongoDB 6.0
\`\`\`bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update package list
sudo apt update

# Install MongoDB
sudo apt install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod
\`\`\`

### 2.2 Secure MongoDB
\`\`\`bash
# Connect to MongoDB
mongosh

# Create admin user
use admin
db.createUser({
  user: "admin",
  pwd: "your-secure-password",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})

# Create application database and user
use aurevion
db.createUser({
  user: "aurevion_user",
  pwd: "your-app-password",
  roles: [ { role: "readWrite", db: "aurevion" } ]
})

exit
\`\`\`

### 2.3 Enable MongoDB Authentication
\`\`\`bash
# Edit MongoDB config
sudo nano /etc/mongod.conf

# Add these lines under security section:
security:
  authorization: enabled

# Restart MongoDB
sudo systemctl restart mongod
\`\`\`

## Step 3: Clone and Setup Application

### 3.1 Create Application Directory
\`\`\`bash
sudo mkdir -p /var/www/aurevion-pharma
sudo chown -R $USER:$USER /var/www/aurevion-pharma
cd /var/www/aurevion-pharma
\`\`\`

### 3.2 Clone Repository
\`\`\`bash
# If using Git
git clone <your-repository-url> .

# Or upload files via SCP/SFTP
\`\`\`

### 3.3 Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3.4 Setup Environment Variables
\`\`\`bash
# Copy example env file
cp .env.example .env

# Edit with your actual values
nano .env
\`\`\`

**Important:** Update these values:
- `MONGODB_URI` - Your MongoDB connection string
  \`\`\`
  MONGODB_URI=mongodb://aurevion_user:your-app-password@localhost:27017/aurevion
  \`\`\`
- `USE_MONGODB=true` - Enable MongoDB (required for production)
- `NEXT_PUBLIC_SITE_URL` - Your domain
- `ADMIN_USERNAME` and `ADMIN_PASSWORD` - Secure credentials
- `SESSION_SECRET` - Generate with: `openssl rand -base64 32`

### 3.5 Seed Database
\`\`\`bash
# Populate MongoDB with initial data
npm run seed
\`\`\`

This will create:
- Product categories
- Sample products
- Services
- CMS content (home, about, contact, footer)

### 3.6 Build Application
\`\`\`bash
npm run build
\`\`\`

### 3.7 Start Application
\`\`\`bash
pm2 start ecosystem.config.js
\`\`\`

### 3.8 Save PM2 Configuration
\`\`\`bash
pm2 save
\`\`\`

### 3.9 Verify Application is Running
\`\`\`bash
pm2 status
pm2 logs aurevion-pharma
\`\`\`

## Step 4: Configure Nginx

### 4.1 Create Nginx Configuration
\`\`\`bash
sudo nano /etc/nginx/sites-available/aurevion-pharma
\`\`\`

Copy the contents from `nginx.conf.example` and update:
- Replace `your-domain.com` with your actual domain
- Update SSL certificate paths (after Step 5)

### 4.2 Enable Site
\`\`\`bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/aurevion-pharma /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
\`\`\`

## Step 5: Setup SSL with Let's Encrypt

### 5.1 Install Certbot
\`\`\`bash
sudo apt install -y certbot python3-certbot-nginx
\`\`\`

### 5.2 Obtain SSL Certificate
\`\`\`bash
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
\`\`\`

Follow the prompts to:
- Enter your email
- Agree to terms
- Choose whether to redirect HTTP to HTTPS (recommended: Yes)

### 5.3 Auto-renewal
Certbot automatically sets up renewal. Test it:
\`\`\`bash
sudo certbot renew --dry-run
\`\`\`

## Step 6: Configure Firewall

\`\`\`bash
# Allow SSH
sudo ufw allow OpenSSH

# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
\`\`\`

## Step 7: Setup Deployment Script

### 7.1 Make Deploy Script Executable
\`\`\`bash
chmod +x deploy.sh
\`\`\`

### 7.2 Deploy Updates
\`\`\`bash
sudo ./deploy.sh
\`\`\`

## Useful Commands

### PM2 Commands
\`\`\`bash
# View logs
pm2 logs aurevion-pharma

# Restart application
pm2 restart aurevion-pharma

# Stop application
pm2 stop aurevion-pharma

# View monitoring dashboard
pm2 monit

# View application info
pm2 info aurevion-pharma
\`\`\`

### Nginx Commands
\`\`\`bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx

# View error logs
sudo tail -f /var/log/nginx/error.log

# View access logs
sudo tail -f /var/log/nginx/access.log
\`\`\`

### Application Logs
\`\`\`bash
# View application logs
tail -f /var/www/aurevion-pharma/logs/out.log
tail -f /var/www/aurevion-pharma/logs/err.log
\`\`\`

## Troubleshooting

### Application Won't Start
1. Check PM2 logs: `pm2 logs aurevion-pharma`
2. Verify environment variables: `cat .env`
3. Check port 3000 is not in use: `sudo lsof -i :3000`
4. Rebuild application: `npm run build`

### 502 Bad Gateway
1. Ensure application is running: `pm2 status`
2. Check Nginx configuration: `sudo nginx -t`
3. Verify proxy_pass port matches application port
4. Check firewall rules: `sudo ufw status`

### SSL Certificate Issues
1. Verify domain DNS points to server IP
2. Check certificate expiry: `sudo certbot certificates`
3. Renew manually: `sudo certbot renew`

### Performance Issues
1. Check server resources: `htop` or `top`
2. Increase PM2 instances in ecosystem.config.js
3. Enable Nginx caching
4. Optimize images and assets

### MongoDB Connection Issues
1. Check MongoDB is running: `sudo systemctl status mongod`
2. Verify connection string in `.env`
3. Test connection: `mongosh "mongodb://aurevion_user:password@localhost:27017/aurevion"`
4. Check MongoDB logs: `sudo tail -f /var/log/mongodb/mongod.log`

### Database Not Seeded
1. Ensure MongoDB is running
2. Check connection string is correct
3. Run seed script: `npm run seed`
4. Check for errors in output

## Monitoring

### Setup PM2 Monitoring (Optional)
\`\`\`bash
# Install PM2 monitoring
pm2 install pm2-logrotate

# Configure log rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
\`\`\`

### Setup Uptime Monitoring
Consider using services like:
- UptimeRobot (free)
- Pingdom
- StatusCake

## Backup Strategy

### Database Backup (if applicable)
\`\`\`bash
# Create backup script
sudo nano /usr/local/bin/backup-aurevion.sh
\`\`\`

### Application Backup
\`\`\`bash
# Backup application files
tar -czf aurevion-backup-$(date +%Y%m%d).tar.gz /var/www/aurevion-pharma

# Backup to remote location
rsync -avz /var/www/aurevion-pharma user@backup-server:/backups/
\`\`\`

## Security Best Practices

1. **Keep System Updated**
   \`\`\`bash
   sudo apt update && sudo apt upgrade -y
   \`\`\`

2. **Use Strong Passwords**
   - Change default admin credentials
   - Use password manager

3. **Enable Fail2Ban**
   \`\`\`bash
   sudo apt install fail2ban
   sudo systemctl enable fail2ban
   \`\`\`

4. **Regular Backups**
   - Automate daily backups
   - Test restore procedures

5. **Monitor Logs**
   - Check application logs regularly
   - Set up log alerts for errors

## Support

For issues or questions:
- Check application logs: `pm2 logs aurevion-pharma`
- Review Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Verify environment configuration

## Updates and Maintenance

To deploy updates:
\`\`\`bash
cd /var/www/aurevion-pharma
sudo ./deploy.sh
\`\`\`

This will:
- Pull latest code
- Install dependencies
- Build application
- Restart with zero downtime

## Automated Setup (Recommended)

For quick setup, use the provided setup script:

\`\`\`bash
# Make script executable
chmod +x setup-vps.sh

# Run setup script
sudo ./setup-vps.sh
\`\`\`

This script will:
- Update system packages
- Install Node.js 18.x
- Install PM2
- Install MongoDB
- Install Nginx
- Configure firewall
- Create application directory

After running the setup script, continue with Step 3 (Clone and Setup Application).

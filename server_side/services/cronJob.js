// cronJob.js
const cron = require('node-cron');
const User = require('../models/User');

function startCronJob() {
    cron.schedule('0 0 * * *', async () => {
        try {
            // Decrement daysRemaining for each user
            await User.updateMany({ daysRemaining: { $gt: 0 } }, { $inc: { daysRemaining: -1 } });

             // Update status for users with daysRemaining reaching 0
             await User.updateMany({ daysRemaining: 0, status: { $ne: 'completed' } }, { $set: { status: 'completed' } });
             
            console.log('Daily update: Decremented daysRemaining for all users');
        } catch (error) {
            console.error('Error in daily update:', error);
        }
    });
}

module.exports = { startCronJob };

let notificationQueue = [];

const notificationContainer = document.getElementById('notification-container');

function queueNotification(message, type = 'blue') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notificationQueue.push(notification);
    if (type == 'green') {notification.style = 'background-color:rgb(113, 238, 117);'}; // green is when effects start
    if (type == 'yellow') {notification.style = 'background-color:rgb(252, 255, 96);'}; // yellow is for coupons
    if (type == 'red') {notification.style = 'background-color:rgb(250, 102, 76);'}; // red is when effects end
    if (type == 'blue') {notification.style = 'background-color:rgb(73, 173, 255);'}; // blue is for information
}

function showQueuedNotifications(amount = 1) {
    for (i = 0; i < amount; i++) {
        if (notificationQueue.length >= 1) {
            let notif = notificationQueue[0];
            notificationContainer.appendChild(notif);
            notificationQueue.shift();
            setTimeout(() => {
                notificationContainer.removeChild(notif);   
            }, 5000);
        }
    }
}

function showNotification(message, type) {
    queueNotification(message, type);
    showQueuedNotifications();
}
let notificationQueue = [];

const notificationContainer = document.getElementById('notification-container');

class Notification {
    constructor(message, type) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        if (type == 'green') {notification.style = 'background-color:rgb(113, 238, 117);'} // green is when effects start
        else if (type == 'yellow') {notification.style = 'background-color:rgb(252, 255, 96);'} // yellow is for coupons
        else if (type == 'red') {notification.style = 'background-color:rgb(250, 102, 76);'} // red is when effects end
        else {notification.style = 'background-color:rgb(73, 173, 255);'}; // blue is for information. anything else defaults to blue

        notificationContainer.appendChild(notification);
        setTimeout(() => {
            notificationContainer.removeChild(notification);   
        }, 5000);
    }
}
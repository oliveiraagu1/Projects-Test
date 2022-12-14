import { NotificationRepository } from 'src/app/repositories/notifications-repostiroy';
import { Notification } from 'src/app/entities/notification/notification';

export class InMemoryNotificationRepository implements NotificationRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}

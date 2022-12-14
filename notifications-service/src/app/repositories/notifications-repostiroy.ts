import { Notification } from '../entities/notification/notification';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
}

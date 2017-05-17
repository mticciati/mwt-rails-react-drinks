import ActionCable from 'actioncable';
import { WS_URL } from '../config/constants'

export const CreateConsumer = () => {
  window.App.cable = ActionCable.createConsumer(`${WS_URL}`)
}
import Ticket from '../models/ticket.model';
import Batch from '../models/batch.model';
import * as utils from '../utils/randomCodeGen';

//get Single Ticket
export const getTicketDetails = async (ticketId) => {
  console.log("ticket---",ticketId);
  const data = await Ticket.findOne({"Ticket_Id":ticketId});
  if (data) {
    return data;
  } else {
    throw new Error('Ticket does not exists');
  }
};

//raise new ticket
export const raiseTicket = async (CICId, body, file) => {
  const ticket = await Ticket.findOne({ CIC_Id: CICId });

  let batchDetails = await Batch.findOne({ 'engineers.CIC_Id': CICId });
  if (file && file.filename) {
    body.file = `http://localhost:3000/file/${file.filename}`;
  }
  const engineers = batchDetails.engineers;
  let fulName = engineers.find((eng) => eng.CIC_Id === CICId).fullName;

  if (!ticket) {
    let randomNum = utils.randomeCode();
    let ticketId = 'TIK-ID-' + randomNum;

    const data = await Ticket.create({
      raisedBy: body.userId,
      Ticket_Id: ticketId,
      CIC_Id: CICId,
      engineerName: fulName,
      ...body,
      followUp: []
    });
    return data;
  }
  if (ticket) {
    let newTicket = await Ticket.updateOne({ CIC_Id: CICId }, body);
    return newTicket;
  }
};

//add follow up
export const addfollowup = async (ticketId, body) => {
  const ticketDetails = await Ticket.findOne({ Ticket_Id: ticketId });
  if (!ticketDetails) {
    throw new Error('Ticket does not exists');
  }
  const newData = await Ticket.updateOne(
    { Ticket_Id: ticketId },
    {
      $push: {
        followUp: {
          followupBy: body.userId,
          ...body
        }
      }
    }
  );
  return newData;
};

import Ticket from '../models/ticket.model';
import * as utils from '../utils/randomCodeGen';

//getSingleTicket
export const getSingleTicket = async (Ticket_Id) => {
  const data = await Ticket.findOne({ Ticket_Id });
  if (data) {
    return data;
  } else {
    throw new Error(`${Ticket_Id}  does not exists`);
  }
};

//raise new ticket
export const raiseNewTicket = async (req) => {
  let CICId = req.params.CIC_Id;
  const ticket = await Ticket.findOne({ CIC_Id: CICId });

  let randomNum = utils.randomeCode();
  let ticketId = 'TIK-ID-' + randomNum;
  if (req.file && req.file.filename) {
    req.body.file = `http://localhost:3000/file/${req.file.filename}`;
  }

  if (ticket == null) {
    const data = await Ticket.create({
      Ticket_Id: ticketId,
      CIC_Id: CICId,
      ticketName: req.body.ticketName,
      engineerName: req.body.engineerName,
      issueType: req.body.issueType,
      description: req.body.description,
      additionInfo: req.body.additionInfo,
      status: req.body.status,
      assignedTo: req.body.assignedTo,
      followUp: []
    });
    return data;
  }
  let newData;
  if (ticket) {
    newData = await Ticket.updateOne({ CIC_Id: req.params.CIC_Id }, req.body);
    return newData;
  }
};

//add follow up
export const followUp = async (req) => {
  let ticketId = req.params.Ticket_Id;
  const data = await Ticket.findOne({ Ticket_Id: ticketId });
  let newFollowUp = data.followUp;
  newFollowUp.push(req.body);
  let newData;
  if (data) {
    newData = await Ticket.findOneAndUpdate(
      { Ticket_Id: ticketId },
      {
        Ticket_Id: data.Ticket_Id,
        CIC_Id: data.CIC_Id,
        ticketName: data.ticketName,
        engineerName: data.engineerName,
        issueType: data.issueType,
        description: data.description,
        additionInfo: data.additionInfo,
        status: data.status,
        assignedTo: data.assignedTo,
        followUp: newFollowUp
      },
      { new: true }
    );
    return newData;
  }
};

import Ticket from '../models/ticket.model';

//getSingleTicket

export const getSingleTicket = async (CIC_Id) => {
  const data = await Ticket.findOne({ CIC_Id });
  if (data) {
    return data;
  } else {
    throw new Error(`${ CIC_Id }  does not exists`)
  }
};

//raise new ticket
export const raiseNewTicket = async (req) => {
  const ticket = await Ticket.findOne({ CIC_Id: req.params.CIC_Id });
  let file = `http://localhost:3000/file/${req.file.filename}`;
 
  if (ticket == null) {
    const data = await Ticket.create({
      CIC_Id: req.params.CIC_Id,
      ticketName: req.body.ticketName,
      engineerName: req.body.engineerName,
      issueType: req.body.issueType,
      description: req.body.description,
      additionInfo: req.body.additionInfo,
      file: file,
      status: req.body.status,
      assignedTo: req.body.assignedTo
    });
    return data;
  }
  let newData;
  if (ticket) {
    newData = await Ticket.updateOne(
      { CIC_Id: req.params.CIC_Id },
      {
        $set: {
          CIC_Id: req.params.CIC_Id,
          ticketName: req.body.ticketName,
          engineerName: req.body.engineerName,
          issueType: req.body.issueType,
          description: req.body.description,
          additionInfo: req.body.additionInfo,
          file: file,
          status: req.body.status,
          assignedTo: req.body.assignedTo
        }
      }
    );  
    return newData;
  }
};

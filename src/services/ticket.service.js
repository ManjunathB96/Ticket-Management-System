import Ticket from '../models/ticket.model';


//create new batch
export const createNewTicket = async (userId, body) => {
   
    const ticket = await Ticket.findOne({ 'CIC_Id': body.CIC_Id });
    console.log('ticket=======>', ticket);
    if (ticket == null) {
      const data = await Ticket.create({
            CIC_Id:body.CIC_Id,
            ticketName:body.ticketName,
            engineerName:body.engineerName,
            issueType:body.issueType,
            description:body.description,
            additionInfo:body.additionInfo,
            file:body.file,
            status:body.status,
            assignedTo:body.assignedTo 
      });
      return data;
    } else {
      throw new Error('Ticket already exists for engineer');
    }
  };


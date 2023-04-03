import Ticket from '../models/ticket.model';

//getSingleTicket

export const getSingleTicket = async (CIC_Id) => {
  const data = await Ticket.findOne({CIC_Id});
  return data;
};

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





  export const uploadFile = async (req) => {
    console.log("service statred");
    console.log("file details---->",req.file);

    console.log("file name---->",req.file.filename);

    const ticket= await Ticket.findOne({CIC_Id:req.params.CIC_Id });
    console.log('ticket=======>', ticket);

    if (ticket) {
     let file=`http://localhost:3000/file/${req.file.filename}`
      const data = await Ticket.findOneAndUpdate({CIC_Id: req.params.CIC_Id },{
            CIC_Id:ticket.CIC_Id,
            ticketName:ticket.ticketName,
            engineerName:ticket.engineerName,
            issueType:ticket.issueType,
            description:ticket.description,
            additionInfo:ticket.additionInfo,
            file:file,
            status:ticket.status,
            assignedTo:ticket.assignedTo 
      },{new:true});
      console.log("service ended  and data--->",data);
      return data;
   }else{
    throw new Error('File upload failed');
   }
  };
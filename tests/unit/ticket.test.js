import TicketModel from '../../src/models/ticket.model';
import * as TicketService from '../../src/services/ticket.service';
import chai from 'chai';
import sinon from 'sinon';
const expect = chai.expect;

describe('Raise new ticket', function () {
  const ticketDetails = {
    ticketName: 'Installation Problem',
    engineerName: '	Tanu Belagavi',
    issueType: 'File missing',
    description:
      'During installation of redis in the system environment variables file path is not added',
    additionInfo: '	NO',
    file: 'http://localhost:3000/file/undefined_1680945320225.jpg',
    status: 'Open',
    assignedTo: 'Admin'
  };
  describe('create ticket', function () {
    it('should raise ticket', async function () {
      const createTicket = sinon.stub(TicketModel, 'create').returns(ticketDetails);
      const ticketExists = sinon.stub(TicketModel, 'findOne').returns(null);
      const ticket = await TicketService.raiseTicket("CIC-ID-16562641",ticketDetails,"http://localhost:3000/file/undefined_1680945320225.jpg");
      expect(createTicket.calledOnce).to.be.true;
      expect(ticket.ticketName).to.equal(ticketDetails.ticketName);
      expect(ticket.engineerName).to.equal(ticketDetails.engineerName);
      expect(ticket.issueType).to.equal(ticketDetails.issueType);
      expect(ticket.description).to.equal(ticketDetails.description);
      expect(ticket.additionInfo).to.equal(ticketDetails.additionInfo);
      expect(ticket.file).to.equal(ticketDetails.file);
      expect(ticket.status).to.equal(ticketDetails.status);
      expect(ticket.assignedTo).to.equal(ticketDetails.assignedTo);
    });
  });
});

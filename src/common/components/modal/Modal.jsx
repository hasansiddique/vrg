import React, {PureComponent} from 'react';
import {Modal, ModalHeader} from 'react-bootstrap';
import PropTypes from 'prop-types';

// Modals
import Authentication from '../../authentication';
import AdWizard from '../../../advertisement/wizard';
import AvailabilityCalendar from '../../../listed-property/availability-info/availability-calendar';
import BookingRentalInfo from '../../../dashboard/content/bookings/rental-info';
import BookingTenantInfo from '../../../dashboard/content/bookings/tenant-info';

class ModalComponent extends PureComponent {
  constructor() {
    super();

    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.props.toggleModalVisibility(false);
    this.props.toggleModalType('');
  }

  render() {
    const {modalIsOpen, modalType} = this.props;
    let modalToShow = '';

    if (modalType === 'register') {
      modalToShow = (
        <Authentication
          closeModal={this.closeModal}/>
      );
    } else if (modalType === 'availability-calendar') {
      modalToShow = (
        <AvailabilityCalendar
          closeModal={this.closeModal}/>
      );
    } else if (modalType === 'ad-wizard') {
      modalToShow = (
        <AdWizard
          closeModal={this.closeModal}/>
      );
    } else if (modalType === 'rental-info') {
      modalToShow = (
        <BookingRentalInfo
          closeModal={this.closeModal}/>
      );
    } else if (modalType === 'tenant-info') {
      modalToShow = (
        <BookingTenantInfo
          closeModal={this.closeModal}/>
      );
    }

    let largeModalsList = ['register', 'ad-wizard', 'rental-info', 'tenant-info'];
    return (
      <Modal
        show={modalIsOpen}
        bsSize={largeModalsList.includes(modalType) ? "lg" : "sm"}
        onHide={this.closeModal}>
        {modalToShow}
      </Modal>
    );
  }
}

ModalComponent.propTypes = {
  toggleModalVisibility: PropTypes.func.isRequired,
  toggleModalType: PropTypes.func.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string.isRequired,
};

export default ModalComponent;

import React, { Component, PropTypes } from 'react';

export default class Notification extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    let Alert;
    switch (this.props.data.type) {
      case 1:
        Alert = require('./Types/Following');
        break;
      case 2:
        Alert = require('./Types/PostSpanked');
        break;
      case 3:
        Alert = require('./Types/PublicationSpanked');
        break;
      case 4:
        Alert = require('./Types/PublicationSpanked');
        break;
      case 5:
        Alert = require('./Types/ForumModerator');
        break;
      case 6:
        Alert = require('./Types/ForumApproved');
        break;
      case 7:
        Alert = require('./Types/ForumRejected');
        break;
      case 8:
        Alert = require('./Types/ForumPending');
        break;
      case 9:
        Alert = require('./Types/RelationshipPending');
        break;
      case 10:
        Alert = require('./Types/RelationshipApproved');
        break;
      case 11:
        Alert = require('./Types/RelationshipRejected');
        break;
      case 12:
        Alert = require('./Types/RelationshipCancelled');
        break;
      case 13:
        Alert = require('./Types/DeletedPost');
        break;
      case 14:
        Alert = require('./Types/EditedPost');
        break;
      case 15:
        Alert = require('./Types/PublicationCommentSpanked');
        break;
      case 16:
        Alert = require('./Types/UserKnows');
        break;
      case 17:
        Alert = require('./Types/PictureModerated');
        break;
      case 18:
        Alert = require('./Types/ChatRoomInvite');
        break;
      case 19:
        Alert = require('./Types/PageRecommend');
        break;
      case 20:
        Alert = require('./Types/SadesAssign');
        break;
      case 21:
        Alert = require('./Types/BankTransaction');
        break;
      default:
        Alert = require('./Types/Unknown');
    }

    return <Alert data={this.props.data} />;
  }
}

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTodo } from '../actions';
import Moment from 'react-moment';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { editing: false, description: '', priority:false};
    this.cardRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
}
 

  componentDidMount = () => {
    this.setState({ description: this.props.description,priority:this.props.priority });
    document.addEventListener('mousedown', this.handleClickOutside);
  }


componentWillUnmount =() => document.removeEventListener('mousedown', this.handleClickOutside);

handleClickOutside = e => {
    if (this.cardRef && !this.cardRef.current.contains(e.target)) {
      this.setState({ editing: false});
    }
}
  handleDeleteTodo = e => {
    e.stopPropagation();
    this.props.deleteTodo();
  };

  showEditForm = e => {
    e.stopPropagation();
    this.setState(prevState => ({ editing: !prevState.editing }));
  };

  changePriority = e => {
    const {priority} = this.props;
    e.stopPropagation();
    let changeablePriority = priority;
    this.setState(prevState => ({priority: !prevState.priority}))
    this.props.updateTodo(this.props.id, this.state.description ,!changeablePriority);
  }

  onInputClick = e => {
    e.stopPropagation();
  };

  onInputChange = e => {
    this.setState({ description: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.setState(prevState => ({ editing: !prevState.editing }));
    this.props.updateTodo(this.props.id, this.state.description,this.state.priority);
  };

  render() {
    const { description, isCompleted, toggleTodo,createDate } = this.props;

    return (
      <li className="card" ref={this.cardRef}>
        <div className="card-container" style={{
          background: isCompleted ? '#C6D947' : ''
        }}>
          <div className="card-body" onClick={this.state.editing ? false : toggleTodo}>
            <div className="description-wp">
            <span style={{ display: this.state.editing ? 'none' : '' }}>
            {description} 
          </span>
          <form
            className="form"
            style={{ display: this.state.editing ? 'inline' : 'none' }}
            onSubmit={this.onFormSubmit}
          >
            <input
              className="edit-todo"
              type="text"
              value={this.state.description || ''}
              onClick={this.onInputClick}
              onChange={this.onInputChange}
              ref={input => input && input.focus()}
            />
          </form>
            </div>

          </div>
          <div className="card-footer">
          <Moment format="D MMM YYYY" withTitle style={{fontStyle:"italic"}}>
                {createDate}
          </Moment>
          <div className="icon-list">
          <span className="icon" onClick={this.handleDeleteTodo} style={{marginRight:0}}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-icon">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect x="0" y="0" width="24" height="24" />
                <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#fff" fillRule="nonzero" />
                <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#fff" />
              </g>
            </svg>
          </span>
          <span className="icon edit" onClick={this.showEditForm} >
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-icon">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect x="0" y="0" width="24" height="24" />
                <path d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z" fill="#fff" fillRule="nonzero" transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) " />
                <rect fill="#fff" x="5" y="20" width="15" height="2" rx="1" />
              </g>
            </svg>
          </span>
          <span className="icon edit" onClick={this.changePriority} >
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="svg-icon">
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <polygon points="0 0 24 0 24 24 0 24"/>
        <path d="M12,18 L7.91561963,20.1472858 C7.42677504,20.4042866 6.82214789,20.2163401 6.56514708,19.7274955 C6.46280801,19.5328351 6.42749334,19.309867 6.46467018,19.0931094 L7.24471742,14.545085 L3.94038429,11.3241562 C3.54490071,10.938655 3.5368084,10.3055417 3.92230962,9.91005817 C4.07581822,9.75257453 4.27696063,9.65008735 4.49459766,9.61846284 L9.06107374,8.95491503 L11.1032639,4.81698575 C11.3476862,4.32173209 11.9473121,4.11839309 12.4425657,4.36281539 C12.6397783,4.46014562 12.7994058,4.61977315 12.8967361,4.81698575 L14.9389263,8.95491503 L19.5054023,9.61846284 C20.0519472,9.69788046 20.4306287,10.2053233 20.351211,10.7518682 C20.3195865,10.9695052 20.2170993,11.1706476 20.0596157,11.3241562 L16.7552826,14.545085 L17.5353298,19.0931094 C17.6286908,19.6374458 17.263103,20.1544017 16.7187666,20.2477627 C16.5020089,20.2849396 16.2790408,20.2496249 16.0843804,20.1472858 L12,18 Z" fill={this.state.priority ? '#F4E757' : '#fff'}/>
    </g>
</svg>
          </span>
          </div>

          </div>
        </div>
      </li>
    );
  }
}

export default connect(
  null,
  { updateTodo }
)(Todo);

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';

const TaskDetail = ({
    id,
    comments,
    task,
    isComplete,
    groups,
    setTaskCompletion,
    setTaskGroup,
    setTaskName
}) => (
        <div>
            <div>
                <input type="text" value={task.name} onChange={setTaskName} />
            </div>
            <div>
                <button onClick={() => { setTaskCompletion(id, !isComplete) }}>{isComplete ? 'Reopen' : 'Complete'}</button>
            </div>

            <div>
                <select name="" id="" value={task.group} onChange={setTaskGroup}>
                    {groups.map((group) => {
                        return (<option key={group.id} value={group.id}>{group.name}</option>)
                    })}
                </select>
            </div>
            <div>
                <Link to="/dashboard">
                    <button>Done</button>
                </Link>
            </div>
        </div>
    )

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.id; //type.id
    let task = state.tasks.find(task => task.id === id);
    let groups = state.groups;

    return {
        id,
        task,
        groups,
        isComplete: task.isComplete
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const id = ownProps.match.params.id;
    return {
        setTaskCompletion(id, isComplete) {
            dispatch(mutations.setTaskCompletion(id, isComplete));
        },
        setTaskGroup(event) {
            dispatch(mutations.setTaskGroup(id, event.target.value));
        },
        setTaskName(event) {
            dispatch(mutations.setTaskName(id, event.target.value));
        }
    }
}

export const ConnectTaskDetailed = connect(mapStateToProps, mapDispatchToProps)(TaskDetail);


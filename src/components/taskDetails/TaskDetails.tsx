import Axios from "axios";
import React, { Component } from "react";

type TaskDetailsState = {
    task: any,
    taskId: any
};

interface TaskDetailsProps {
    taskId: any
}

export default class TaskDetails extends Component {

    state: TaskDetailsState = {
        task: null,
        taskId: null
    }

    constructor(props: TaskDetailsProps) {
        super(props);
        this.state.taskId = props.taskId;
    }

    async componentDidMount() {
        const result = await Axios.get(`/crawler_info/${this.state.taskId}`);
        const task = result.data;
        this.setState({ task });
    }

    render() {
        return (
            <div>
                {this.state.taskId}
            </div>
        )
    }
}
import Axios from "axios";
import React, { Component } from "react";

type TaskBrowserState = {
    tasks: any[];
};

export default class TaskBrowser extends Component {

    state: TaskBrowserState = {
        tasks: []
    }

    async componentDidMount() {
        const result = await Axios.get('/crawler_results');
        const tasks = result.data;
        this.setState({ tasks });
    }

    render() {
        const tasks = this.state.tasks.map(task => (
            <tr>
                <th scope="row">{task.task_id}</th>
                <td>{task.state}</td>
                <td>{task.status}</td>
                <td>{task.argument}</td>
            </tr>
        ))
        // shall we add row filtering through props?
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">State</th>
                            <th scope="col">Status</th>
                            <th scope="col">Argument</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks}
                    </tbody>
                </table>
            </div>
        )
    }
}
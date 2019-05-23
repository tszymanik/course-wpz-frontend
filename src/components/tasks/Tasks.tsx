import axios from 'axios';
import React, { Component } from 'react';

import Header from '../header/Header';
import styles from './Tasks.module.scss';

type TaskResponse = {
  results: {
    '_id': string,
    result: string;
  },
};

type Task = {
  id: string;
  result: string;
};

type TasksState = {
  tasks: Task[];
};

export default class Tasks extends Component {
  state: TasksState = {
    tasks: []
  }

  async componentDidMount() {
    const promise = await axios.get('/crawler_results');
    const response: TaskResponse[] = promise.data;
    const tasks: Task[] = [];

    response.forEach((taskResponse) => {
      tasks.push({
        id: taskResponse.results['_id'],
        result: taskResponse.results.result,
      } as Task);
    });

    this.setState({ tasks });
  }

  render() {
    const { tasks } = this.state;

    return (
      <>
        <Header />
        <div className="container">
          <div className={styles.content}>
            <div className="row">
              <div className="col-lg-6">
                <table className={['table table-borderless table-sm', styles.tasks].join(' ')}>
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <tr key={task.id}>
                        <td scope="row">{task.id}</td>
                        <td>{task.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
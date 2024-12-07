import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { getCourses as getSchedules, 
  createCourse as createSchedule, 
  updateCourse as updateSchedule, 
  deleteCourse as deleteSchedule } from '../../redux/courseRelated/courseActions';
import Popup from '../../components/Popup';

const localizer = momentLocalizer(moment);

const Schedule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { schedules, loading, error, status, response } = useSelector(state => state.schedule);

  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(getSchedules());
  }, [dispatch]);

  useEffect(() => {
    if (schedules) {
      const formattedEvents = schedules.map(schedule => ({
        id: schedule._id,
        title: schedule.courseId,
        start: new Date(schedule.timetable.start),
        end: new Date(schedule.timetable.end)
      }));
      setEvents(formattedEvents);
    }
  }, [schedules]);

  useEffect(() => {
    if (status === 'added' || status === 'updated' || status === 'deleted') {
      dispatch(getSchedules());
      setMessage(response);
      setShowPopup(true);
    } else if (status === 'failed' || status === 'error') {
      setMessage(response || 'Network Error');
      setShowPopup(true);
    }
  }, [status, response, dispatch]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      const newEvent = { courseId: title, timetable: { start, end } };
      dispatch(createSchedule(newEvent));
    }
  };

  const handleSelectEvent = (event) => {
    const action = window.prompt('Edit or Delete? (e/d)');
    if (action === 'e') {
      const title = window.prompt('New Event name', event.title);
      if (title) {
        const updatedEvent = { courseId: title, timetable: { start: event.start, end: event.end } };
        dispatch(updateSchedule(event.id, updatedEvent));
      }
    } else if (action === 'd') {
      dispatch(deleteSchedule(event.id));
    }
  };

  return (
    <Container>
      <CalendarContainer>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
        />
      </CalendarContainer>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </Container>
  );
};

export default Schedule;

const Container = styled.div`
  padding: 2rem;
  background-color: #f4f4f9;
  min-height: 100vh;
`;

const CalendarContainer = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
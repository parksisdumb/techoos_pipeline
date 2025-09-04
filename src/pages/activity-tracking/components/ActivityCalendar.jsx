import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityCalendar = ({ activities, onReschedule, onQuickAction }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'day'

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })?.format(date);
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })?.format(date);
  };

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek?.getDay();
    const diff = startOfWeek?.getDate() - day;
    startOfWeek?.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date?.setDate(startOfWeek?.getDate() + i);
      days?.push(date);
    }
    return days;
  };

  const getActivitiesForDate = (date) => {
    return activities?.filter(activity => {
      const activityDate = new Date(activity.scheduledDate);
      return activityDate?.toDateString() === date?.toDateString();
    });
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setDate(currentDate?.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const navigateDay = (direction) => {
    const newDate = new Date(currentDate);
    newDate?.setDate(currentDate?.getDate() + direction);
    setCurrentDate(newDate);
  };

  const getActivityIcon = (type) => {
    const icons = {
      call: 'Phone',
      email: 'Mail',
      site_visit: 'MapPin',
      follow_up: 'Clock',
      proposal: 'FileText',
      meeting: 'Users'
    };
    return icons?.[type] || 'Calendar';
  };

  const getActivityColor = (type) => {
    const colors = {
      call: 'bg-blue-100 text-blue-700 border-blue-200',
      email: 'bg-green-100 text-green-700 border-green-200',
      site_visit: 'bg-purple-100 text-purple-700 border-purple-200',
      follow_up: 'bg-orange-100 text-orange-700 border-orange-200',
      proposal: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      meeting: 'bg-pink-100 text-pink-700 border-pink-200'
    };
    return colors?.[type] || 'bg-muted text-muted-foreground border-border';
  };

  const weekDays = getWeekDays();
  const todayActivities = getActivitiesForDate(currentDate);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Activity Calendar</h2>
            <p className="text-sm text-muted-foreground">Schedule and manage your activities</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'week' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewMode === 'day' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              Day
            </button>
          </div>
        </div>
      </div>
      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          size="sm"
          iconName="ChevronLeft"
          onClick={() => viewMode === 'week' ? navigateWeek(-1) : navigateDay(-1)}
        >
          Previous
        </Button>

        <h3 className="text-lg font-semibold text-foreground">
          {viewMode === 'week' 
            ? `Week of ${formatDate(weekDays?.[0])}`
            : formatDate(currentDate)
          }
        </h3>

        <Button
          variant="outline"
          size="sm"
          iconName="ChevronRight"
          iconPosition="right"
          onClick={() => viewMode === 'week' ? navigateWeek(1) : navigateDay(1)}
        >
          Next
        </Button>
      </div>
      {/* Calendar View */}
      {viewMode === 'week' ? (
        <div className="grid grid-cols-7 gap-2">
          {weekDays?.map((day, index) => {
            const dayActivities = getActivitiesForDate(day);
            const isToday = day?.toDateString() === new Date()?.toDateString();

            return (
              <div
                key={index}
                className={`p-3 rounded-lg border min-h-32 ${
                  isToday 
                    ? 'border-primary bg-primary/5' :'border-border bg-background'
                }`}
              >
                <div className={`text-sm font-medium mb-2 ${
                  isToday ? 'text-primary' : 'text-foreground'
                }`}>
                  {formatDate(day)}
                </div>
                <div className="space-y-1">
                  {dayActivities?.slice(0, 3)?.map((activity) => (
                    <div
                      key={activity?.id}
                      className={`p-2 rounded text-xs border ${getActivityColor(activity?.type)}`}
                    >
                      <div className="flex items-center space-x-1">
                        <Icon name={getActivityIcon(activity?.type)} size={12} />
                        <span className="font-medium">{formatTime(new Date(activity.scheduledDate))}</span>
                      </div>
                      <div className="truncate mt-1">{activity?.title}</div>
                    </div>
                  ))}
                  {dayActivities?.length > 3 && (
                    <div className="text-xs text-muted-foreground text-center py-1">
                      +{dayActivities?.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {todayActivities?.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Calendar" size={48} className="mx-auto mb-3 opacity-50" />
              <p>No activities scheduled for this day</p>
            </div>
          ) : (
            todayActivities?.map((activity) => (
              <div
                key={activity?.id}
                className={`p-4 rounded-lg border ${getActivityColor(activity?.type)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name={getActivityIcon(activity?.type)} size={20} />
                    <div>
                      <div className="font-medium">{activity?.title}</div>
                      <div className="text-sm opacity-80">
                        {formatTime(new Date(activity.scheduledDate))} • {activity?.account}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => onReschedule(activity)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreHorizontal"
                      onClick={() => onQuickAction(activity)}
                    />
                  </div>
                </div>
                {activity?.notes && (
                  <p className="text-sm mt-2 opacity-80">{activity?.notes}</p>
                )}
              </div>
            ))
          )}
        </div>
      )}
      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          iconName="Phone"
          iconPosition="left"
          onClick={() => onQuickAction({ type: 'schedule_call' })}
        >
          Schedule Call
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Mail"
          iconPosition="left"
          onClick={() => onQuickAction({ type: 'schedule_email' })}
        >
          Schedule Email
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="MapPin"
          iconPosition="left"
          onClick={() => onQuickAction({ type: 'schedule_visit' })}
        >
          Schedule Visit
        </Button>
      </div>
    </div>
  );
};

export default ActivityCalendar;
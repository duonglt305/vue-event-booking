import moment from "moment";

export default {
    methods: {
        getSessionByChannel(channel) {
            if (channel && channel.rooms) {
                return channel.rooms.reduce((result, room) => {
                    let sessions = room.sessions;
                    let newSessions = sessions.map(session => {
                        return {
                            ...session,
                            room: room.name
                        }
                    });
                    return [...result, ...newSessions];
                }, []).sort((c, n) => {
                    let ct = moment(c.start).toDate().getTime(), nt = moment(n.start).toDate().getTime();
                    return ct - nt;
                })
            }
            return [];
        }
    }
}

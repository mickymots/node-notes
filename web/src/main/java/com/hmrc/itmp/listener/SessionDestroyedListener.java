package com.hmrc.itmp.listener;

import com.hmrc.itmp.security.UserRoleHashMap;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.security.web.session.HttpSessionDestroyedEvent;

import javax.servlet.http.HttpSession;

public class SessionDestroyedListener implements ApplicationListener<HttpSessionDestroyedEvent> {
    static final Logger log = Logger.getLogger(SessionDestroyedListener.class);

    @Autowired
    UserRoleHashMap cachedSession;

    @Override
    public void onApplicationEvent(HttpSessionDestroyedEvent event) {
        log.debug(" --- Session Destroyed --- ");
        HttpSession session = event.getSession();
        String userID = (String) session.getAttribute("userID");
        cachedSession.removeUserSession(userID);
        log.debug(" UserID = " + userID + " : Session Ended");
    }
}
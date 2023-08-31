import { Injectable } from '@angular/core';

@Injectable()
export class Constant {
  public get(ns: string, code: string): any {
    return (CONST as any)[ns][code];
  }
}

export namespace CONST {
  export namespace APP_CONFIG {
    export const ENDPOINT_CONFIG = 'ENDPOINT_CONFIG';
    export const NAVIGATION_CONFIG = 'NAVIGATION_CONFIG';
    export const MENU_CONFIG = 'MENU_CONFIG';
    export const ERROR_CONFIG = 'ERROR_CONFIG';
    export const ENVIRONMENT_CONFIG = 'ENVIRONMENT_CONFIG';
    export const SYSTEM_CONFIG = 'SYSTEM_CONFIG';
    export const USER_CONFIG = 'USER_CONFIG';
  }
  export namespace ROUTE_TARGETS {
    export const TARGET_TAB = 'TAB';
    export const TARGET_WINDOW = 'WINDOW';
    export const TARGET_REFRESH = 'REFRESH';
    export const TARGET_PAGE = 'PAGE';
    export const TARGET_LINK = 'LINK';
  }
  export namespace ENDPOINTS {
    export const GET_CUSTOMER_FEEDBACK = 'get_customer_feedback';
    export const GET_FEEDBACK_DISCOUNT = 'get_feedback_discount';
    export const CREATE_FEEDBACK_DISCOUNT = 'create_feedback_discount';
    export const GIVE_FEEDBACK_DISCOUNT = 'put_feedback_discount';
    export const POST_MERCHANT_REPLY = 'post_merchant_email';
    export const GET_ITEM_RANKINGS = 'get_item_rankings';
    export const GET_ITEM_COMMENTS = 'get_item_comments';
    export const GET_SELECTED_RANKING = 'get_selected_ranking';
    export const GET_SELECTED_COMMENT = 'get_selected_comment';
    export const GET_FEEDBACK_OVERVIEW = 'get_feedback_overview';
  }
  export namespace QUERY_PARAMS {
    export const PAGE = 'page';
    export const JOURNEY = 'journey';
    export const PAGE_INDEX = 'pageIndex';
    export const PAGE_SIZE = 'pageSize';
  }
  export namespace DEFAULTS {
    export const DATE_LOCALE = 'en-GB';
    export const DATE_FORMAT = 'DD/MM/YYYY';
    export const TIME_FORMAT = 'hh:mm A';
  }
  export namespace DATE_FORMATTERS {
    export const DATE_FORMAT_SLASH_YEAR_TIME = 'dd/MM/yyyy hh:mma';

  }
  export namespace REGULAR_EXPRESSIONS {
    export const REGULAR_EXPRESSIONS_SLASH_YEAR = /^\d{4}\/\d{1,2}\/\d{1,2}$/;
    export const REGULAR_EXPRESSIONS_SLASH_DAY = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
   }
  export namespace NAVIGATIONS {
    export const ADD_NEW_SKU = 'CREATE_SKU_ITEM';
  }

  export namespace DAYS {
    export const SHORT_MON = 'mon';
    export const MONDAY = 'Monday';
    export const SHORT_TUE = 'tue';
    export const TUESDAY = 'Tuesday';
    export const SHORT_WED = 'wed';
    export const WEDNESDAY = 'Wednesday';
    export const SHORT_THU = 'thu';
    export const THURSDAY = 'Thursday';
    export const SHORT_FRI = 'fri';
    export const FRIDAY = 'Friday';
    export const SHORT_SAT = 'sat';
    export const SATURDAY = 'Saturday';
    export const SHORT_SUN = 'sun';
    export const SUNDAY = 'Sunday';
    export const SHORT_DAYS = [SHORT_MON, SHORT_TUE, SHORT_WED, SHORT_THU, SHORT_FRI, SHORT_SAT, SHORT_SUN];
    export const LONG_DAYS = [MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY];
  }

  export namespace ICONS {
    export const ICON_CLEAR = 'assets\\img\\icons\\clear.svg';
    export const ICON_FILTER = 'assets\\img\\icons\\filter.svg';
    export const ICON_FLIPV = 'assets\\img\\icons\\filter-verticle.svg';
    export const ICON_GTHUMBSUP = 'assets\\img\\icons\\g-thumbs-up.svg';
    export const ICON_LIKE = 'assets\\img\\icons\\like.svg';
    export const ICON_LEFT = 'assets\\img\\icons\\left.svg';
    export const ICON_MENUITEM = 'assets\\img\\icons\\menu_item.svg';
    export const ICON_MISSED = 'assets\\img\\icons\\missed.svg';
    export const ICON_MOREVERTICLE = 'assets\\img\\icons\\more-vertical.svg';
    export const ICON_NEWORDER = 'assets\\img\\icons\\new-order.svg';
    export const ICON_RTHUMBSDOWN = 'assets\\img\\icons\\r-thumbs-down.svg';
    export const ICON_RATINGTHUMBSUP = 'assets\\img\\icons\\rating-thumbsup.svg';
    export const ICON_SENDDARK = 'assets\\img\\icons\\send-dark.svg';
    export const ICON_SEND = 'assets\\img\\icons\\send.svg';
    export const ICON_SILVERLOYALTY = 'assets\\img\\icons\\silver-loyalty.svg';
    export const ICON_SMALLCOMMENT = 'assets\\img\\icons\\small_comment.svg';
    export const ICON_SMALLLIKE = 'assets\\img\\icons\\small_like.svg';
    export const ICON_SMALLTHUMBSDOWN = 'assets\\img\\icons\\small_thumbs_down.svg';
    export const ICON_SMALLTHUMBSUP = 'assets\\img\\icons\\small_thumbs_up.svg';
    export const ICON_SMALLUNLIKE = 'assets\\img\\icons\\small_unlike.svg';
    export const ICON_STROKE = 'assets\\img\\icons\\stroke.svg';
    export const ICON_TICK = 'assets\\img\\icons\\tick.svg';
    export const ICON_UNLIKE = 'assets\\img\\icons\\unlike.svg';
    export const ICON_USERPROFILE = 'assets\\img\\icons\\user-profile.png';
    export const ICON_USERW = 'assets\\img\\icons\\user-w.svg';
    export const ICON_USER = 'assets\\img\\icons\\user.svg';
    export const ICON_LABEL = 'assets\\img\\label.svg';
    export const ICON_LOGO = 'assets\\img\\logo.png';
  }

  export namespace DIMENSIONS {
    export const TAB_SCROLL_OFFSET = 70;
  }
}

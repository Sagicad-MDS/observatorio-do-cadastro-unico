/* eslint-disable no-unused-vars */
import 'focus-visible'
import BRAccordion from '../../components/accordion/accordion'
import BRBreadcrumb from '../../components/breadcrumb/breadcrumb'
import BRCard from '../../components/card/card'
import BRCarousel from '../../components/carousel/carousel'
import BRCheckbox from '../../components/checkbox/checkbox'
import BRCookiebar from '../../components/cookiebar/cookiebar'
import BRDateTimePicker from '../../components/datetimepicker/datetimepicker'
import BRFooter from '../../components/footer/footer'
import BRHeader from '../../components/header/header'
import BRInput from '../../components/input/input'
import BRItem from '../../components/item/item'
import BRList from '../../components/list/list'
import BRMenu from '../../components/menu/menu'
import BRAlert from '../../components/message/message'
import BRModal from '../../components/modal/modal'
import BRNotification from '../../components/notification/notification'
import BRPagination from '../../components/pagination/pagination'
import BRScrim from '../../components/scrim/scrim'
import BRSelect from '../../components/select/select'
import BRStep from '../../components/step/step'
import BRTab from '../../components/tab/tab'
import BRTable from '../../components/table/table'
import BRTag from '../../components/tag/tag'
import BRTextarea from '../../components/textarea/textarea'
import BRTooltip from '../../components/tooltip/tooltip'
import BRUpload from '../../components/upload/upload'
import BRWizard from '../../components/wizard/wizard'
import Accordion from './behavior/accordion'
import Checkgroup from './behavior/checkgroup'
import Collapse from './behavior/collapse'
import Scrim from './behavior/scrim'
import Swipe from './behavior/swipe'

import Tooltip from './behavior/tooltip'
import Behavior from './core.behavior'
import { Dropdown, Globals } from './globals-class'

const globals = new Globals()
globals.initInstanceAll()

const behavior = new Behavior()
behavior.initInstanceAll()

export {
  Accordion,
  Checkgroup,
  BRAccordion,
  Dropdown,
  BRBreadcrumb,
  BRCarousel,
  Collapse,
  BRCard,
  BRCheckbox,
  BRCookiebar,
  BRDateTimePicker,
  BRFooter,
  BRHeader,
  BRInput,
  BRItem,
  BRList,
  BRMenu,
  BRAlert,
  BRModal,
  BRNotification,
  BRPagination,
  BRScrim,
  BRSelect,
  BRStep,
  BRTab,
  BRTable,
  BRTag,
  BRTextarea,
  BRTooltip,
  BRUpload,
  BRWizard,
  Globals,
  Tooltip,
  globals,
  behavior,
  Swipe,
  Scrim,
}

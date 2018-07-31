import C from '../constants/jobs';
import C_feedback from '../constants/feedback';
import { database } from '../firebaseApp';
import jobfields from './jobfields';

const jobsRef = database.ref('jobs');
const jobfieldsRef=database.ref('jobfields');
const regionsRef = database.ref('regions');

export const listenToJobs = () => dispatch =>
  jobsRef.on(
    'value',
    snapshot =>
  // console.log(snapshot.val()),
     dispatch({
        type: C.JOBS_RECEIVE_DATA,
        data: Object.keys(snapshot.val()).map(key => ({ title: snapshot.val()[key].content.position, location: snapshot.val()[key].content.location, company: snapshot.val()[key].content.company,
        JobField:snapshot.val()[key].content.JobField })),
      }),
    error =>
      dispatch({
        type: C.JOBS_RECEIVE_DATA_ERROR,
        message: error.message,
      }),
  );
  export const submitSearch = content => (dispatch, getState) => {
    const state = getState();
    const searchParams = {
      content,
      username: state.auth.username,
      uid: state.auth.uid,
    };
    console.log(content.selectRolesArr);
    console.log('selectRolesArr');
    var tree='content/';
    var orderby='jobfield';
   // var jobFieldId;
   /*    jobfieldsRef.on('value', function (snap) {
      var ArrayJobFieldId=Object.keys(snap.val()).filter(key => (snap.val()[key].content.name==content.selectJobField))
      var jobFielId=ArrayJobFieldId[0];
      console.log(jobFielId);
        regionsRef.on('value',function(reginSnap){
        var arrayReginId=Object.keys(reginSnap.val()).filter(key => (reginSnap.val()[key].content.name==content.selectRegion))
        var reginId=arrayReginId[0];
        console.log('arrayReginId');
        console.log(arrayReginId);
        console.log(reginId);
*/
       jobsRef.orderByChild(tree+orderby).equalTo(content.selectJobField).on(
        'value',
      snapshot =>
      dispatch({
          type: C.SEARCH_RECEIVE_DATA,
       //   dataSearch: Object.keys(snapshot.val()).map(key => ({ title: snapshot.val()[key].content.position, location: snapshot.val()[key].content.location, company: snapshot.val()[key].content.company })),
         /* dataSearch: Object.keys(snapshot.val()).filter(elem=>snapshot.val()[elem].content.region==content.selectRegion)
          .map(key => ({ title: snapshot.val()[key].content.position, location: snapshot.val()[key].content.location, company: snapshot.val()[key].content.company })),
         */
         //content.selectRole!=''?
          dataSearch:Object.keys(snapshot.val())
          .filter((key => {
              let bKeep = true;
              let bKeep2=true;
              const elem = snapshot.val()[key];
              if(content.checkedArr&&content.checkedArr[0] && elem.content.position!==content.checkedArr[0])
                bKeep=false;   
                  //return false
               if(typeof (content.selectRegion)!="undefined" && elem.content.region !== content.selectRegion)   
                  bKeep2=false;  
               return bKeep&&bKeep2;
          }))
          /*.filter((key => {
            let bKeep = true;
            const elem = snapshot.val()[key];
            if(typeof (content.selectRegion)!="undefined" && elem.content.region !== content.selectRegion)
             // bKeep=false;   
                return false
            return bKeep;
        }))*/
         /* .filter(elem=>content.checkedArr&&content.checkedArr[0]?
           snapshot.val()[elem].content.position==content.checkedArr[0]
           :Object.keys(snapshot.val()))*/
       
      
           // .filter(elem=>snapshot.val()[elem].content.position==content.selectRole) 
        //.filter(elem=>content.selectRegion!=undefined?
        // snapshot.val()[elem].content.region==content.selectRegion:Object.keys(snapshot.val()))
          .map(key => ({ title: snapshot.val()[key].content.position, location: snapshot.val()[key].content.location, 
          company: snapshot.val()[key].content.company })),
         // datafilter:snapshot.val(),
        /* content.selectRegion!=''?.filter(elem=>snapshot.val()[elem].content.region==content.selectRegion):
          .map(key => ({ title: snapshot.val()[key].content.position, location: snapshot.val()[key].content.location, 
          company: snapshot.val()[key].content.company }))
          .map(key => ({ title: snapshot.val()[key].content.position, location: snapshot.val()[key].content.location, 
          company: snapshot.val()[key].content.company }))*/
        }),
      error =>
        dispatch({
          type: C.SEARCH_RECEIVE_DATA_ERROR,
          message: error.message,
        }),
    );
      //});
        // });/////////////////////////////////////////////////////////////////////////
//});
 // });/////////////////////////////////////////////////////////////////////////////
       }
//console.log(datajobfield);
     /* jobsRef.orderByChild(tree+orderby).equalTo(content.selectedJobField).on(
        'value',
      snapshot =>
      dispatch({
          type: C.SEARCH_RECEIVE_DATA,
          dataSearch: Object.keys(snapshot.val()).map(key => ({ title: snapshot.val()[key].content.position, location: snapshot.val()[key].content.location, company: snapshot.val()[key].content.company })),
        }),
      error =>
        dispatch({
          type: C.SEARCH_RECEIVE_DATA_ERROR,
          message: error.message,
        }),
      );*/
 

export const submitJob = content => (dispatch, getState) => {
  const state = getState();
  const job = {
    content,
    username: state.auth.username,
    uid: state.auth.uid,
  };
  dispatch({ type: C.JOB_AWAIT_CREATION_RESPONSE });
  jobsRef.push(job, (error) => {
    dispatch({ type: C.JOB_RECEIVE_CREATION_RESPONSE });
    if (error) {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_ERROR,
        error: `Job submission failed! ${error}`,
      });
    } else {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_MESSAGE,
        message: 'Job successfully saved!',
      });
    }
  });
};

export const startJobEdit = qid => dispatch =>
  dispatch({ type: C.JOB_EDIT, qid });

export const cancelJobEdit = qid => dispatch =>
  dispatch({ type: C.JOB_EDIT_FINISH, qid });

export const submitJobEdit = (qid, content) => (dispatch, getState) => {
  const state = getState();
  const job = {
    content,
    username: state.auth.username,
    uid: state.auth.uid,
  };
  
  dispatch({ type: C.JOB_EDIT_SUBMIT, qid });
  jobsRef.child(qid).set(job, (error) => {
    dispatch({ type: C.JOB_EDIT_FINISH, qid });
    if (error) {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_ERROR,
        error: `Job update failed! ${error}`,
      });
    } else {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_MESSAGE,
        message: 'Job successfully updated!',
      });
    }
  });
};

export const deleteJob = qid => (dispatch) => {
  dispatch({ type: C.JOB_EDIT_SUBMIT, qid });
  jobsRef.child(qid).remove((error) => {
    dispatch({ type: C.JOB_EDIT_FINISH, qid });
    if (error) {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_ERROR,
        error: `Job deletion failed! ${error}`,
      });
    } else {
      dispatch({
        type: C_feedback.FEEDBACK_DISPLAY_MESSAGE,
        message: 'Job successfully deleted!',
      });
    }
  });
};

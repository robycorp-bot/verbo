import test from 'node:test';
import assert from 'node:assert/strict';
import {swipeDirection} from './dist/gesture.js';
const start={x:150,y:300,time:0};
test('intentional swipes move one chapter in the expected direction',()=>{
  assert.equal(swipeDirection(start,{x:60,y:305,time:250}),1);
  assert.equal(swipeDirection(start,{x:245,y:302,time:250}),-1);
  assert.equal(swipeDirection(start,{x:155,y:180,time:250}),1);
  assert.equal(swipeDirection(start,{x:155,y:420,time:250}),-1);
});
test('taps, diagonals, slow drags and cancelled gestures do not navigate',()=>{
  for(const end of [{x:155,y:305,time:50},{x:230,y:380,time:250},{x:20,y:300,time:1500}])assert.equal(swipeDirection(start,end),0);
  assert.equal(swipeDirection(null,{x:10,y:10,time:200}),0);
});

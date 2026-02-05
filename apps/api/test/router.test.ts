import { strict as assert } from 'assert';
import { decide } from '../src/web/routes/router';

assert.equal(decide({ text: 'need help with issue' }).category, 'support');
assert.equal(decide({ text: 'invoice payment failed' }).category, 'payment');
assert.equal(decide({ text: 'trial price demo' }).category, 'sales');
assert.equal(decide({ text: 'random' }).category, 'ops');

assert.ok(decide({ text: 'invoice' }).confidence >= 0.75);
assert.ok(decide({ text: 'random' }).confidence <= 0.7);

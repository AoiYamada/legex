const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();
const path = require('path');
const CWD = process.cwd();
const MODULES_PATH = './modules/';

const IsIP = require(path.join(CWD, MODULES_PATH, 'Validators/IsIP'));

// https://blogs.msdn.microsoft.com/testing123/2009/02/06/email-address-test-cases/
const valid_ips = [
    ['115.42.150.37', '115.42.150.37 should be valid'],
    ['192.168.0.1', '115.42.150.37 should be valid'],
    ['110.234.52.124', '115.42.150.37 should be valid']
]

const invalid_ips = [
    ['210.110', 'must have 4 octets'],
    ['255', 'must have 4 octets'],
    ['y.y.y.y', 'only digits are allowed'],
    ['255.0.0.y', 'only digits are allowed'],
    ['666.10.10.20', 'octet number must be between [0-255]'],
    ['4444.11.11.11', 'octet number must be between [0-255]'],
    ['33.3333.33.3', 'octet number must be between [0-255]'],
]

describe('IsIP', () => {
    const ip_check = new IsIP();
    it('Valid IPs', () => {
        for (const [ip, description] of valid_ips) {
            assert(ip_check.check(ip), description);
        }
    });
    it('Invalid IPs', () => {
        for (const [ip, description] of invalid_ips) {
            assert(!ip_check.check(ip), description);
        }
    });
});
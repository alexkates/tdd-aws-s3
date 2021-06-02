jest.mock('aws-sdk', () => ({ S3: jest.fn(() => mockS3) }));

const mockS3 = {
  getObject: jest.fn().mockReturnThis(),
  promise: jest.fn(),
};

describe('When getting an object from AWS S3', () => {
  it('should use the aws-sdk getObject method', async () => {
    // Arrange
    const expectedObject = {};
    const request = { Bucket: 'a bucket', Key: 'a key' };

    // Act
    mockS3.promise.mockImplementation(() => Promise.resolve(expectedObject));
    const actual = await getObject(request);

    // Assert
    expect(actual).toEqual(expectedObject);
    expect(mockS3.getObject).toHaveBeenCalledWith(request);
  });
});

const { S3 } = require('aws-sdk');
const getObject = async (request) => (new S3().getObject(request).promise());
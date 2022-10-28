import { useEffect, useState } from 'react';
import { getReviewRequestIdsByUserAddress } from '../lib';

const MyReviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const getReviews = async () => {
      const reviews = await getReviewRequestIdsByUserAddress();
      // setReviews(reviews);))
    };

    getReviews();
  }, []);
  return (
    <div>
      <h1>My Reviews</h1>
      All outputs that you have been invited to review are listed below.
    </div>
  );
};

export default MyReviews;

const CardList = ({ user, isRequest, ...props }) => {
  return (
    <>
      <div className="flex justify-center my-5">
        <div className="card card-side bg-base-300 shadow-sm w-1/3">
          <div className="avatar">
            <div className="w-30 rounded p-2">
              <img src={user.photopath} className="rounded-md" />
            </div>
          </div>
          <div className="card-body pl-0">
            <h2 className="card-title">
              {user.firstName + " " + user.lastName}
            </h2>
            {user.gender && user.age && (
              <p className="text-xs p-0 m-0">
                {user.gender + ", " + "  Age:" + user.age}
              </p>
            )}
            <p>{user.about}</p>
            {isRequest && (
              <div className="card-actions justify-end">
                <button
                  className="btn btn-xs btn-soft btn-primary"
                  onClick={() =>
                    props.reviewRequest(props.requestId, "rejected")
                  }
                >
                  Reject
                </button>
                <button
                  className="btn btn-xs btn-soft btn-secondary"
                  onClick={() =>
                    props.reviewRequest(props.requestId, "accepted")
                  }
                >
                  Accept
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardList;

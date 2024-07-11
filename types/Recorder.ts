export const statusMessages: { [key: string]: string } = {
    media_aborted: "Oops, failed to listen!",
    permission_denied: "Looks like permission was denied.",
    no_specified_media_found: "Couldn't find the mic.",
    media_in_use: "Someone's using my mic.",
    invalid_media_constraints: "The media constraints seem invalid.",
    no_constraints: "No constraints were given.",
    recorder_error: "Something went wrong with the mic.",
    idle: "Debugging the mic.",
    acquiring_media: "Getting the mixer ready...",
    delayed_start: "Hold on, starting is delayed.",
    recording: "I'll transcribe it when the lecture ends.",
    stopping: "Stopping the recording...",
    stopped: "Recording has stopped.",
    paused: "Recording is paused."
};
